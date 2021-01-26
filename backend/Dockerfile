FROM golang:1.15 as builder
############################################# 
# Stage : builder
# Development go image + air, for live code reload
#############################################
WORKDIR /src

# Install Air
ENV GO111MODULE=off
RUN go get github.com/cosmtrek/air
ENV GO111MODULE=on

# Install dependencies
COPY ./go.mod ./go.sum ./
RUN go mod download

# Copy the code
COPY . .

CMD [ "air" ]