FROM golang:1.21-alpine

WORKDIR /app

COPY go.* ./

RUN go mod download

COPY . .

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o ./loofnote-backend ./cmd

EXPOSE 4000 

CMD ["./loofnote-backend"]

