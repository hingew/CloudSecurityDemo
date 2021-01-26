package api

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

// UploadFile upload a file to bucket
func (api *API) UploadFile(c *fiber.Ctx) error {
	file, err := c.FormFile("document")

	if err != nil {
		return err
	}

	return c.SaveFile(file, fmt.Sprintf("./%s", file.Filename))
}
