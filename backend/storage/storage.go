package storage

import (
	"backend/config"
	"backend/file"
	"backend/models"
	"backend/rand"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"gorm.io/gorm"
)

const filePath = "/tmp/%s"

type Storage struct {
	Client *minio.Client
	Ctx    context.Context
}

func Init(config *config.Config) *Storage {
	ctx := context.Background()

	minioClient, err := minio.New(config.Storage.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(config.Storage.AccessKey, config.Storage.SecretKey, ""),
		Secure: false,
	})

	if err != nil {
		log.Fatal(err)
	}

	for _, v := range config.Storage.Buckets {
		createBucket(ctx, minioClient, v)
	}

	return &Storage{
		Client: minioClient,
		Ctx:    ctx,
	}
}

func createBucket(ctx context.Context, client *minio.Client, name string) {
	err := client.MakeBucket(ctx, name, minio.MakeBucketOptions{})

	if err != nil {
		exists, errBucketExists := client.BucketExists(ctx, name)

		if errBucketExists == nil && exists {
			log.Printf("Bucket exists %s", name)
		} else {
			log.Fatal(err)
		}
	}
}

func (s *Storage) Download(fileModel models.File) (*os.File, error) {
	files := []string{}

	for _, v := range fileModel.Parts {
		if err := s.DownloadFile(v.FileName, fmt.Sprintf(filePath, v.FileName), v.Bucket); err != nil {
			return nil, err
		}

		newFileName, err := s.DecryptFile(v.FileName, filePath, []byte(fileModel.Key))

		if err != nil {
			return nil, err
		}

		files = append(files, newFileName)
	}

	if err := file.MergeFiles(fileModel.FileName, files); err != nil {
		return nil, err
	}

	r, err := os.Open(fmt.Sprintf(filePath, fileModel.FileName))

	if err != nil {
		return nil, err
	}

	return r, nil
}

func (s *Storage) Upload(filename string, config *config.Config, db *gorm.DB, userID uint) error {
	files := file.SplitFile(filename, config)
	key := rand.String(32)
	parts := []models.Part{}

	for i, v := range files {
		fileName, err := s.EncryptFile(v, filePath, []byte(key))

		if err != nil {
			return err
		}

		if err := s.uploadFile(fileName, fmt.Sprintf(filePath, fileName), config.Storage.Buckets[i]); err != nil {
			return err
		}

		parts = append(parts, models.Part{FileName: fileName, Bucket: config.Storage.Buckets[i]})

		log.Println("delete file: " + v)
		if err := file.DeleteFile(v); err != nil {
			return err
		}

		log.Println("delete file: " + fileName)
		if err := file.DeleteFile(fileName); err != nil {
			return err
		}
	}

	// create a new File database entry
	if err := db.Create(&models.File{
		FileName: filename,
		Parts:    parts,
		UserID:   userID,
		Key:      string(key),
	}).Error; err != nil {
		return err
	}

	return file.DeleteFile(filename)
}

func (s *Storage) uploadFile(fileName string, filePath string, bucket string) error {
	if _, err := s.Client.FPutObject(s.Ctx, bucket, fileName, filePath, minio.PutObjectOptions{}); err != nil {
		return err
	}

	return nil
}

func (s *Storage) DownloadFile(fileName string, filePath string, bucket string) error {
	if err := s.Client.FGetObject(s.Ctx, bucket, fileName, filePath, minio.GetObjectOptions{}); err != nil {
		return err
	}

	return nil
}
