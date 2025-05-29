document.querySelector("#register").addEventListener("click", async () => {
  try {
    const data = {
      first_name: document.querySelector("#first_name").Value,
      last_name: document.querySelector("#last_name").Value,
      age: document.querySelector("#age").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };

    const url = "api/auth/register";
    let response = await fetch(url, opts);
    response = await response.json();
    //console.log(response);
    if (response.error){
        alert(response.error)
    } else {
        location.replace("/login");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
});
