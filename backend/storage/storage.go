package storage

import (
	"backend/config"
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"os"
	"strconv"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
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

func (s *Storage) SplitAndUpload(filename string, config *config.Config) error {
	files := splitFile(filename, config)

	for i, v := range files {
		err := s.UploadFile(v, fmt.Sprintf(filePath, v), config.Storage.Buckets[i])

		if err != nil {
			return err
		}
	}

	return nil
}

func (s *Storage) UploadFile(fileName string, filePath string, bucket string) error {
	if _, err := s.Client.FPutObject(s.Ctx, bucket, fileName, filePath, minio.PutObjectOptions{}); err != nil {
		return err
	}

	return nil
}

func splitFile(filename string, config *config.Config) []string {
	file, err := os.Open(fmt.Sprintf(filePath, filename))

	splitFiles := []string{}

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	fileInfo, _ := file.Stat()

	var fileSize int64 = fileInfo.Size()

	fileChunk := int(fileSize) / (len(config.Storage.Buckets)) // 1 MB, change this to your requirement

	// calculate total number of parts the file will be chunked into

	totalPartsNum := uint64(math.Ceil(float64(fileSize) / float64(fileChunk)))

	fmt.Printf("Splitting to %d pieces.\n", totalPartsNum)

	for i := uint64(0); i < totalPartsNum; i++ {

		partSize := int(math.Min(float64(fileChunk), float64(fileSize-int64(i*uint64(fileChunk)))))
		partBuffer := make([]byte, partSize)

		file.Read(partBuffer)

		// write to disk
		partName := filename + ".part" + strconv.FormatUint(i, 10)
		_, err := os.Create(partName)

		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		// write/save buffer to disk
		ioutil.WriteFile(fmt.Sprintf(filePath, partName), partBuffer, os.ModeAppend)

		log.Println("Split to : ", partName)
		splitFiles = append(splitFiles, partName)
	}

	return splitFiles

}
