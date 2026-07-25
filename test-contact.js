async function testContact() {
  const payload = {
    name: "Test User",
    email: "testuser@example.com",
    subject: "Test Subject",
    message: "This is a test message with more than 10 characters",
    serviceId: "6a6461849978c3517be38440"
  };

  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

testContact();
