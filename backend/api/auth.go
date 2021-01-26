package api

import (
	"backend/models"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

// LoginInput login input data
type LoginInput struct {
	Identifier string `json:"identifier"`
	Password   string `json:"password"`
}

// Register register a user
func (api *API) Register(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(ErrorResponse{"Body is invalid", err})
	}

	err := user.PasswordHash(user.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(ErrorResponse{"Password hash failed", err})
	}

	if err := api.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(ErrorResponse{"User exists", err})
	}

	protectedUser := user.ToProtected()
	return c.JSON(protectedUser)
}

// Login authenticate a user
func (api *API) Login(c *fiber.Ctx) error {
	var (
		input LoginInput
		user  *models.User
	)

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(ErrorResponse{"Body is invalid", err})
	}

	user, err := models.GetUserByIdentifier(api.DB, input.Identifier)

	if err != nil {
		return c.Status(500).JSON(ErrorResponse{"Could not get user", err})
	}

	if user == nil {
		return c.Status(fiber.ErrNotFound.Code).JSON(ErrorResponse{"User not found", err})
	}

	if !user.PasswordCheck(input.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(ErrorResponse{"Unauthorized", err})
	}

	t, err := user.GetJWTToken(api.Config.JWTSecret)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(ErrorResponse{"Unauthorized", err})
	}

	return c.JSON(fiber.Map{"token": t})
}
