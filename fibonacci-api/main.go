// Copyright: 2020 Arm Ltd. All Rights Reserved.

package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

// FibonacciResponse represents the response to a request for a specific order of the
// Fibonacci sequence. For example a request for the 4th order of the sequence would
// have Order:4, Value: 3.
type FibonacciResponse struct {
	Order int `json:"order"`
	Value int `json:"value"`
}

type FibResponse struct {
	Type string `json:"type"`
	Value int `json:"value"`
}

func slowFibonacciHandler(w http.ResponseWriter, req *http.Request) {
	// Get the requested order from the URL query string (i.e. http://localhost:8080/fibonacci?order=4)
	queryParams := req.URL.Query()
	pathParam := req.URL.Path
	orderStr := queryParams.Get("order")
	// Error checking - has it been provided? Is it a positive integer?
	if orderStr == "" {
		http.Error(w, "You must provide a series order with your request via the 'order' query parameter", 400)
		return
	}
	orderInt, err := strconv.Atoi(orderStr)
	if err != nil || orderInt < 1 {
		http.Error(w, fmt.Sprintf("Provided order '%s' not a positive integer", orderStr), 400)
		return
	}
	// Prepare response
	switch pathParam {
	case "/fibonacci":
		value := fibonacci(orderInt)
		fibResp := FibonacciResponse{
			Order: orderInt,
			Value: value,
		}
		jsonBytes, _ := json.Marshal(&fibResp)
		fmt.Fprint(w, string(jsonBytes))
		return
	case "/recursive-fibonacci":
		value := recursive_fibonacci(orderInt)
		fibResp := FibResponse{
			Type: "testing recursive",
			Value: value,
		}
		jsonBytes, _ := json.Marshal(&fibResp)
		fmt.Fprint(w, string(jsonBytes))
		return
}

}

// Return the value of the Fibonacci sequence for the given order, with 1 being the first order.
// For example, the 1st and second orders of the sequence are '1' and the 4th order is '3'.
func fibonacci(order int) int {
	if order == 1 {
		return 1
	}
	previous := 0
	current := 1
	for i := 1; i < order; i++ {
		new := previous + current
		previous = current
		current = new
	}
	return current
}

func recursive_fibonacci(order int)  (ret int) {
	if order == 0 {
		return 0
	 }
	if order == 1 {
		return 1
	}
	return recursive_fibonacci(order-1) + recursive_fibonacci(order-2)
}


func main() {
	http.HandleFunc("/fibonacci", slowFibonacciHandler)
	http.HandleFunc("/recursive-fibonacci", slowFibonacciHandler)
	http.ListenAndServe(":8080", nil)
}
