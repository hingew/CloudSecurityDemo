package storage

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"strings"
)

// EncryptFile encrypt a file with given key, retruns a new filename
func (s *Storage) EncryptFile(fileName string, filePath string, key []byte) (string, error) {
	plaintext, err := ioutil.ReadFile(fmt.Sprintf(filePath, fileName))
	newFileName := fileName + "_aes"

	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)

	if err != nil {
		return "", err
	}

	ciphertext := make([]byte, aes.BlockSize+len(plaintext))
	iv := ciphertext[:aes.BlockSize]

	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], plaintext)

	f, err := os.Create(fmt.Sprintf(filePath, newFileName))

	if err != nil {
		return "", err
	}

	_, err = io.Copy(f, bytes.NewReader(ciphertext))

	return newFileName, err
}

// DecryptFile decrypt a file by the given key and return a new filename
func (s *Storage) DecryptFile(fileName string, filePath string, key []byte) (string, error) {
	ciphertext, err := ioutil.ReadFile(fmt.Sprintf(filePath, fileName))
	newFileName := strings.Split(fileName, "_aes")[0]
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)

	if err != nil {
		return "", err
	}

	if len(ciphertext) < aes.BlockSize {
		return "", errors.New("ciphertext is too short")
	}

	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)

	stream.XORKeyStream(ciphertext, ciphertext)
	f, err := os.Create(fmt.Sprintf(filePath, newFileName))

	if err != nil {
		return "", err
	}

	_, err = io.Copy(f, bytes.NewReader(ciphertext))

	return newFileName, nil
}
