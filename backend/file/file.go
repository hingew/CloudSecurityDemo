package file

import (
	"backend/config"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"math"
	"os"
	"strconv"
)

const filePath = "/tmp/%s"

// MergeFiles merge multiple files together
func MergeFiles(originalFileName string, fileNames []string) error {
	out, err := os.OpenFile(fmt.Sprintf(filePath, originalFileName), os.O_CREATE|os.O_WRONLY, 0644)

	if err != nil {
		return err
	}

	for _, v := range fileNames {
		if err := mergeSingleFile(out, v); err != nil {
			return err
		}
	}

	return nil
}

func mergeSingleFile(out *os.File, fileName string) error {
	file, err := os.Open(fmt.Sprintf(filePath, fileName))
	if err != nil {
		return err
	}

	defer file.Close()

	if _, err := io.Copy(out, file); err != nil {
		return err
	}

	return nil
}

// SplitFile split one file into multiple parts
func SplitFile(fileName string, config *config.Config) []string {
	file, err := os.Open(fmt.Sprintf(filePath, fileName))

	splitFiles := []string{}

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()
	fileInfo, _ := file.Stat()
	var fileSize int64 = fileInfo.Size()
	fileChunk := fileSize / (int64(len(config.Storage.Buckets))) // 1 MB, change this to your requirement

	// calculate total number of parts the file will be chunked into
	totalPartsNum := uint64(math.Floor(float64(fileSize) / float64(fileChunk)))

	for i := uint64(0); i < totalPartsNum; i++ {

		partSize := int(math.Min(float64(fileChunk), float64(fileSize-int64(i*uint64(fileChunk)))))
		partBuffer := make([]byte, partSize)

		file.Read(partBuffer)

		// write to disk
		partName := fileName + ".part" + strconv.FormatUint(i, 10)
		_, err := os.Create(fmt.Sprintf(filePath, partName))

		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		// write/save buffer to disk
		ioutil.WriteFile(fmt.Sprintf(filePath, partName), partBuffer, os.ModeAppend)
		splitFiles = append(splitFiles, partName)
	}

	return splitFiles
}

// DeleteFile delete a feil by filename
func DeleteFile(fileName string) error {
	return os.Remove(fmt.Sprintf(filePath, fileName))
}
