package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Database environment variables
type Database struct {
	User     string `env:"DB_USER"`
	Password string `env:"DB_PASSWORD"`
	Host     string `env:"DB_HOST"`
	Port     string `env:"DB_PORT"`
	Db       string `env:"DB_DATABASE"`
}

// Config for for the application
type Config struct {
	Env       string `env:"APP_ENV"`
	Port      string `env:"APP_PORT"`
	Database  Database
	JWTSecret string `env:"JWT_SECRET"`
	Storage   Storage
}

type Storage struct {
	Endpoint  string
	AccessKey string
	SecretKey string
	Buckets   []string
}

// Init read the .env file
func Init() *Config {
	// load for different environments
	getEnv()

	return &Config{
		Env:  os.Getenv("APP_ENV"),
		Port: os.Getenv("APP_PORT"),
		Database: Database{
			User:     os.Getenv("DB_USER"),
			Password: os.Getenv("DB_PASSWORD"),
			Host:     os.Getenv("DB_HOST"),
			Port:     os.Getenv("DB_PORT"),
			Db:       os.Getenv("DB_DATABASE"),
		},
		JWTSecret: os.Getenv("JWT_SECRET"),
		Storage: Storage{
			Endpoint:  os.Getenv("S3_ENDPOINT"),
			AccessKey: os.Getenv("S3_ACCESS_KEY"),
			SecretKey: os.Getenv("S3_SECRET_KEY"),
			Buckets:   []string{"west", "east", "north"},
		},
	}
}

// GetDatabasePath returns the database connection string for postgres sql
func (a *Config) GetDatabasePath() string {
	return fmt.Sprintf("host=%s password=%s user=%s dbname=%s sslmode=disable",
		a.Database.Host,
		a.Database.Password,
		a.Database.User,
		a.Database.Db,
	)
}

func getEnv() {
	env := os.Getenv("APP_ENV")

	var err error
	if env != "test" {
		err = godotenv.Load()
	} else {
		err = godotenv.Load("../.env")
	}

	if err != nil {
		log.Fatal("Reading environment Variables Failed!", err)
	}
}
