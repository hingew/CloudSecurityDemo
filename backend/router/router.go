package router

import (
	"backend/config"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/websocket/v2"
)

// Init the Router and middlewares
func Init(config *config.Config) *fiber.App {
	router := fiber.New()

	// Logging Middleware
	router.Use(logger.New())

	// Cors Middleware
	router.Use(cors.New())

	// Websockets
	router.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}

		return fiber.ErrUpgradeRequired
	})

	return router
}
