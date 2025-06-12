document.getElementById("userUpdate-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {};
  const first_name = form.first_name.value;
  if (first_name) data.first_name = first_name;
  const last_name = form.last_name.value;
  if (last_name) data.last_name = last_name;
  const age = form.age.value;
  if (age) data.age = age;

  const token = localStorage.getItem("token"); // Asegúrate que el token está guardado así

  try {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Error en el registro");
    } else {
      alert("Registro exitoso, redirigiendo...");
      location.replace("/profile");
    }
  } catch (error) {
    alert("Error en la conexión: " + error.message);
  }
});
