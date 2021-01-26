package api_test

import (
	"backend/api"
	"backend/models"
	"backend/utils"
	"testing"
)

func TestRegister(t *testing.T) {
	testAPI := utils.InitTestAPI(t)
	user := models.User{
		Username: "test",
		Email:    "test@test.de",
		Password: "test",
	}

	testCase := utils.TestEndpoint{
		Description:   "Register",
		Method:        "POST",
		Route:         "/register",
		ExpectedError: false,
		ExpectedCode:  200,
		Body:          testAPI.PrepareBody(user),
	}

	testAPI.TestEndpoint(testCase)

	testAPI.DB.Where("email = ?", user.Email).Delete(models.User{})
}

func TestLogin(t *testing.T) {
	testAPI := utils.InitTestAPI(t)
	user := testAPI.CreateUser()

	body := api.LoginInput{
		Identifier: user.Username,
		Password:   "test",
	}

	testCase := utils.TestEndpoint{
		Description:   "Login",
		Method:        "POST",
		Route:         "/login",
		ExpectedError: false,
		ExpectedCode:  200,
		Body:          testAPI.PrepareBody(body),
	}

	testAPI.TestEndpoint(testCase)
	testAPI.DB.Where("email = ?", user.Email).Delete(models.User{})
}
