document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que se envíe el formulario normalmente

  try {
    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    };

    const url = "/api/auth/login"; // asegúrate que comience con "/"
    let response = await fetch(url, opts);
    response = await response.json();

    if (response.error) {
      alert(response.error);
    } else {
      // Si es exitoso, redirige
      location.replace("/");
    }
  } catch (error) {
    console.log(error);
    alert("Error inesperado", error);
  }
});
