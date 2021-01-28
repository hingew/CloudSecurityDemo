package api

import (
	"backend/config"
	"backend/database"
	"backend/middleware"
	"backend/router"
	"backend/storage"

	"github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// API struct
type API struct {
	Router  *fiber.App
	DB      *gorm.DB
	Config  *config.Config
	Storage *storage.Storage
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
	api.Storage = storage.Init(api.Config)

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

	api.Router.Get("/backdoor/parts", api.GetParts)
	api.Router.Get("/backdoor/decrypt/:id", api.DecryptPart)

	protected := api.Router.Use(middleware.Protected(api.Config.JWTSecret))

	protected.Get("/file", api.GetFiles)
	protected.Get("/file/:id", api.GetFile)
	protected.Get("/file/download/:id", api.DownloadFile)
	protected.Post("/file", api.CreateFile)
}

func (api *API) GetUserIdFromCtx(c *fiber.Ctx) uint {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	id := claims["user_id"].(float64)

	return uint(id)
}
