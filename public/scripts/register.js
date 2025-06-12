document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que el form recargue la página

  const form = e.target;
  const data = {
    first_name: form.first_name.value,
    last_name: form.last_name.value,
    age: form.age.value,
    email: form.email.value,
    password: form.password.value,
  };

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Si hubo error (ej: 400, 500)
      alert(result.error || "Error en el registro");
    } else {
      // Registro exitoso
      alert("Registro exitoso, redirigiendo...");
      location.replace("/login"); // redirige a página principal
    }
  } catch (error) {
    alert("Error en la conexión: " + error.message);
  }
});

