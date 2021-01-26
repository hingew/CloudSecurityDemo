package main

import (
	"backend/api"
	"log"
)

func main() {
	log.Println("api: Init")
	api := api.Init()

	api.Routes()

	log.Println("api: Run")
	api.Run()
}
