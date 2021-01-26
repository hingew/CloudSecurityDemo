package utils

import (
	"backend/api"
	"backend/models"
	"bytes"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestEndpoint defintion
type TestEndpoint struct {
	Method        string
	Description   string
	Route         string
	Token         string
	Body          io.Reader
	ExpectedError bool
	ExpectedCode  int
	ExpectedBody  string
}

// TestAPI api definition for testing
type TestAPI struct {
	*api.API
	T *testing.T
}

// InitTestAPI creates a new api struct for testing
func InitTestAPI(t *testing.T) *TestAPI {
	os.Setenv("APP_ENV", "test")

	testAPI := &TestAPI{
		API: api.Init(),
		T:   t,
	}

	testAPI.API.Routes()
	return testAPI
}

// TestEndpoints tests multiple endpoints at once
func (api *TestAPI) TestEndpoints(tests []TestEndpoint) {
	for _, test := range tests {
		api.TestEndpoint(test)
	}
}

func prepareRequest(test TestEndpoint) (*http.Request, error) {
	req, err := http.NewRequest(test.Method, test.Route, test.Body)

	if err != nil {
		return nil, err
	}

	req.Header.Add("Authorization", "Bearer "+test.Token)
	req.Header.Set("Content-Type", "application/json")

	return req, nil
}

// TestEndpoint Run a request at the api for the given Endpoint
func (api *TestAPI) TestEndpoint(test TestEndpoint) {
	req, err := prepareRequest(test)

	if err != nil {
		log.Fatal(err)
	}

	// Run the request
	res, err := api.API.Router.Test(req, -1)

	// verify that no error occurred, that is not expected
	assert.Equal(api.T, test.ExpectedError, err != nil, err)

	if test.ExpectedError {
		return
	}

	assert.Equal(api.T, test.ExpectedCode, res.StatusCode, test.Description, err)

	// error should be nil
	assert.Nilf(api.T, err, test.Description)

	if test.ExpectedBody != "" {
		body, _ := ioutil.ReadAll(res.Body)
		// check if the body is the expected body
		assert.Equalf(api.T, test.ExpectedBody, body, test.Description)
	}
}

// CreateAuthor create a author model for testing
func (api *TestAPI) CreateAuthor() models.Author {
	author := models.Author{
		Name:     "Tim",
		Username: "tim",
	}

	api.DB.Create(&author)
	return author
}

// CreateTweet create a tweet model for testing
func (api *TestAPI) CreateTweet() models.Tweet {
	author := api.CreateAuthor()
	tweet := models.Tweet{
		Text:   "Hello world!",
		Author: &author,
	}

	api.DB.Create(&tweet)
	return tweet
}

// CreateSearch create a search model for testing
func (api *TestAPI) CreateSearch() models.Search {
	search := models.Search{
		Query: "test",
	}

	api.DB.Create(&search)
	return search
}

// CreateList create a list model for testing
func (api *TestAPI) CreateList(owner models.User) models.List {
	list := models.List{
		Name:  "Testing List",
		Owner: owner,
	}

	api.DB.Create(&list)

	return list
}

// CreateUser create a user model for testing
func (api *TestAPI) CreateUser() models.User {
	user := models.User{
		Username: "tester",
		Password: "test",
		Email:    "test@test.de",
	}

	user.PasswordHash(user.Password)

	api.DB.Create(&user)

	return user
}

// CreateUserAndToken create and get the token for testing
func (api *TestAPI) CreateUserAndToken() (models.User, string) {
	user := models.User{
		Username: "tester",
		Password: "test",
		Email:    "test@test.de",
	}

	user.PasswordHash(user.Password)
	api.DB.Create(&user)

	t, err := user.GetJWTToken(api.Config.JWTSecret)

	if err != nil {
		log.Fatal(err)
	}

	return user, t
}

// PrepareBody prepare the request body for testing post requests
func (api *TestAPI) PrepareBody(data interface{}) io.Reader {
	body, err := json.Marshal(&data)

	if err != nil {
		log.Fatal(err)
	}

	return bytes.NewBuffer(body)
}
