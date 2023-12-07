package database

import (
	"backend/internal/models"
	"fmt"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	host     = "db"
	port     = 5432
	user     = "loofnote"
	password = "loofnote"
	dbname   = "loofnote"
)

// InitDB initializes the database connection and returns a *sql.DB instance
func InitDB() (*gorm.DB, error) {
	// Database connection parameters
	// connStr := "user=yourdbuser dbname=notesdb sslmode=disable"
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	// Open a database connection
	// db, err := sql.Open("postgres", connStr)
	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("error connecting to the database: %v", err)
	}

	// Check the database connection
	// err = db.Ping()
	// if err != nil {
	// return nil, fmt.Errorf("error pinging the database: %v", err)
	// }

	// Auto-migrate the schema
	err = db.AutoMigrate(&models.Note{})
	if err != nil {
		return nil, err
	}

	fmt.Println("Connected to the database")
	return db, nil
}
