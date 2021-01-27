package models

// File model struct
type File struct {
	BaseModel
	Name    string
	OwnerID uint
}
