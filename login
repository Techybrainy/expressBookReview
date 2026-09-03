Command:
curl -s -X POST "http://localhost:5000/customer/login" -H "Content-Type: application/json" -d '{"username":"dhruvtest","password":"password123"}'

Terminal output:
{"message":"Login successful","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRocnV2dGVzdCIsImlhdCI6MTc4ODQ3NDg0OCwiZXhwIjoxNzg4NDc4NDQ4fQ.mR_NE8JT1qTlZvAoL6ezRbV-VjJdfR0DwpxppnF6BEw"}