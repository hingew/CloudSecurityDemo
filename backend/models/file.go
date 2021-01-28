package models

// File model struct
type File struct {
	BaseModel
	FileName string `json:"fileName"`
	UserID   uint   `json:"-"`
	Key      string `json:"key"`
	Parts    []Part `json:"parts"`
}
