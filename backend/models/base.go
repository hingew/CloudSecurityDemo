package models

// BaseModel model struct
type BaseModel struct {
	ID uint `gorm:"primaryKey" json:"id,omitempty"`
}
