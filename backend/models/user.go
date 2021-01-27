package models

import (
	"errors"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// User model struct
type User struct {
	BaseModel
	Username string `gorm:"uniqueIndex;not null" json:"username"`
	Email    string `gorm:"uniqueIndex;not null" json:"email"`
	Password string `gorm:"not null" json:"password"`
	Files    []File
}

// ProtectedUser struct, to prevent leaking data
type ProtectedUser struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	ID       uint   `json:"id"`
}

// ToProtected return a protected user without password field
func (user *User) ToProtected() ProtectedUser {
	return ProtectedUser{
		Email:    user.Email,
		Username: user.Email,
		ID:       user.ID,
	}
}

// GetUserByIdentifier get a user by username
func GetUserByIdentifier(db *gorm.DB, identifier string) (*User, error) {
	var user User

	if err := db.Where(&User{Username: identifier}).Or(&User{Email: identifier}).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &user, nil
}

// PasswordHash Hash the current password and set it to user password property
func (user *User) PasswordHash(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}

	user.Password = string(bytes)
	return nil
}

// PasswordCheck check if the given password is correct
func (user *User) PasswordCheck(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err == nil
}

// GetJWTToken generate a JWT token for this user
func (user *User) GetJWTToken(secret string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.ID
	claims["expires_at"] = time.Now().Add(time.Hour * 24).Unix()

	t, err := token.SignedString([]byte(secret))

	return t, err
}
