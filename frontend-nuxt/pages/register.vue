<template>
  <div class="container">
    <Navbar />
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1>Register Account</h1>
        <div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" name="username" class="form-control" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" class="form-control" />
          </div>
        </div>

        <input type="button" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default { components: { Navbar } };
</script>
