package models

// Part model struct
type Part struct {
	BaseModel
	FileName string `json:"fileName"`
	File     File
	FileID   uint   `json:"fileID"`
	Bucket   string `json:"bucket"`
}
