package api

import (
	"backend/models"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
)

func (api *API) GetParts(c *fiber.Ctx) error {
	var parts []models.Part

	if err := api.DB.Find(&parts).Error; err != nil {
		return err
	}

	return c.Status(200).JSON(parts)
}

func (api *API) DecryptPart(c *fiber.Ctx) error {
	id := c.Params("id")

	var part models.Part
	if err := api.DB.Preload("File").First(&part, id).Error; err != nil {
		return err
	}

	if err := api.Storage.DownloadFile(part.FileName, fmt.Sprintf(filePath, part.FileName), part.Bucket); err != nil {
		return err
	}

	fileName, err := api.Storage.DecryptFile(part.FileName, filePath, []byte(part.File.Key))

	if err != nil {
		return err
	}

	out, err := os.Open(fmt.Sprintf(filePath, fileName))

	if err != nil {
		return err
	}

	return c.SendStream(out)
}
