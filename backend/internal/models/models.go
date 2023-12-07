// models/models.go
package models

// Note represents a note in the note app
type Note struct {
	ID    uint   `json:"id" gorm:"primaryKey"`
	Title string `json:"title"`
	Body  string `json:"body"`
}
