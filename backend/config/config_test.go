package config_test

import (
	"backend/config"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestConfigInit(t *testing.T) {
	config := config.Init()

	assert.Equal(t, os.Getenv("APP_ENV"), config.Env)
	assert.Equal(t, os.Getenv("APP_PORT"), config.Port)
	assert.Equal(t, os.Getenv("DB_USER"), config.Database.User)
	assert.Equal(t, os.Getenv("DB_PASSWORD"), config.Database.Password)
	assert.Equal(t, os.Getenv("DB_HOST"), config.Database.Host)
	assert.Equal(t, os.Getenv("DB_PORT"), config.Database.Port)
	assert.Equal(t, os.Getenv("DB_DATABASE"), config.Database.Db)

}
