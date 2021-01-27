package api

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

const filePath = "/tmp/%s"

// UploadFile upload a file to bucket
func (api *API) UploadFile(c *fiber.Ctx) error {
	file, err := c.FormFile("document")

	if err != nil {
		return err
	}

	if err := c.SaveFile(file, fmt.Sprintf(filePath, file.Filename)); err != nil {
		return err
	}

	if err := api.Storage.SplitAndUpload(file.Filename, api.Config); err != nil {
		return err
	}

	return nil
}
