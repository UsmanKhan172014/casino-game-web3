<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1>Please Enter your Information</h1>
        <div>
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
export default {
  data(){
    return {
      email: null,
      password: null,
    }
  },
};
</script>
