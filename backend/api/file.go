package api

import (
	"backend/models"
	"errors"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

const filePath = "/tmp/%s"

// GetFile get a sigle file by id
func (api *API) GetFile(c *fiber.Ctx) error {
	id := c.Params("id")
	userID := api.GetUserIdFromCtx(c)

	var file models.File
	if err := api.DB.First(&file, id).Error; err != nil {
		return fiber.ErrConflict
	}

	if file.UserID != userID {
		return errors.New("not your file")
	}

	return c.Status(200).JSON(file)
}

// GetFiles get all files for the current user
func (api *API) GetFiles(c *fiber.Ctx) error {
	userID := api.GetUserIdFromCtx(c)

	var files []models.File
	if err := api.DB.Preload("Parts").Find(&files, models.File{UserID: userID}).Error; err != nil {
		return err
	}

	return c.Status(200).JSON(files)
}

// CreateFile upload a file to bucket
func (api *API) CreateFile(c *fiber.Ctx) error {
	file, err := c.FormFile("document")
	userID := api.GetUserIdFromCtx(c)

	if err != nil {
		return err
	}

	if err := c.SaveFile(file, fmt.Sprintf(filePath, file.Filename)); err != nil {
		return err
	}

	if err := api.Storage.Upload(file.Filename, api.Config, api.DB, userID); err != nil {
		return err
	}

	return nil
}

// DownloadFile download a file by id
func (api *API) DownloadFile(c *fiber.Ctx) error {
	id := c.Params("id")
	userID := api.GetUserIdFromCtx(c)

	var file models.File
	if err := api.DB.Preload("Parts").First(&file, id).Error; err != nil {
		return err
	}

	if file.UserID != userID {
		return errors.New("not your file")
	}

	out, err := api.Storage.Download(file)

	if err != nil {
		return err
	}

	return c.SendStream(out)
}
