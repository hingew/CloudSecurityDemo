package api

import (
	"backend/config"
	"backend/database"
	"backend/middleware"
	"backend/router"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// API struct
type API struct {
	Router *fiber.App
	DB     *gorm.DB
	Config *config.Config
}

// ErrorResponse error response
type ErrorResponse struct {
	Message string `json:"message"`
	Error   error  `json:"error"`
}

// Init init the application with the given config
func Init() *API {
	api := API{}

	api.Config = config.Init()
	api.Router = router.Init(api.Config)
	api.DB = database.Init(api.Config)

	return &api
}

// Run run the application on the given address
func (api *API) Run() {
	api.Router.Listen(":" + api.Config.Port)
}

// Routes declare the routing of the application
func (api *API) Routes() {
	// auth && register
	api.Router.Post("/login", api.Login)
	api.Router.Post("/register", api.Register)

	// Protected Routes
	protected := api.Router.Use(middleware.Protected(api.Config.JWTSecret))

	protected.Post("/upload", api.UploadFile)
}
