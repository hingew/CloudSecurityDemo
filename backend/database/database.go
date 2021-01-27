package database

import (
	"backend/config"
	"backend/models"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Init the database connection
func Init(c *config.Config) *gorm.DB {
	log.Println("Database: Init")

	db, err := gorm.Open(postgres.Open(c.GetDatabasePath()), &gorm.Config{})

	if err != nil {
		log.Fatal("Could not Connect to database", err)
	}

	log.Println("Database: Migrate...")
	db.AutoMigrate(
		&models.User{},
		&models.File{},
	)

	return db
}
