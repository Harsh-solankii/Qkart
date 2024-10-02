<template>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            v-model="firstname"
            placeholder="Enter your first name"
            v-bind="firstnameAttrs"
          />
          <span v-if="errors.firstname">{{ errors.firstname }}</span>
        </div>
  
        <div class="form-group">
          <label for="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            v-model="lastname"
            placeholder="Enter your last name"
            v-bind="lastnameAttrs"
          />
          <span v-if="errors.lastname">{{ errors.lastname }}</span>
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            v-bind="emailAttrs"
          />
          <span v-if="errors.email">{{ errors.email }}</span>
        </div>
  
        <div class="form-group">
          <label for="phoneno">Phone Number:</label>
          <input
            type="tel"
            id="phoneno"
            v-model="phoneno"
            placeholder="Enter your phone number"
            v-bind="phonenoAttrs"
          />
          <span v-if="errors.phoneno">{{ errors.phoneno }}</span>
        </div>
  
        <div class="form-group">
          <label for="age">Age:</label>
          <input
            type="number"
            id="age"
            v-model="age"
            placeholder="Enter your age"
            v-bind="ageAttrs"
          />
          <span v-if="errors.age">{{ errors.age }}</span>
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            v-bind="passwordAttrs"
          />
          <span v-if="errors.password">{{ errors.password }}</span>
        </div>
  
        <div class="form-group">
          <label for="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            v-model="confirmpassword"
            placeholder="Confirm your password"
            v-bind="confirmpasswordAttrs"
          />
          <span v-if="errors.confirmpassword">{{ errors.confirmpassword }}</span>
        </div>
  
        <button type="submit">Register</button>
      </form>
      <p style="color: red; font-size: 16px;">{{ mainerror }}</p>
      <router-link to="/">Already have an account? Login here.</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import * as yup from 'yup';
  
  const schema = yup.object({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    phoneno: yup.string().min(10).required('Phone number is required'),
    age: yup.number().min(10).max(100).required('Age is required'),
    password: yup.string().min(8).required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmpassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });
  
  const { handleSubmit, errors, defineField } = useForm({
    validationSchema: schema,
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phoneno: '',
      age: '',
      password: '',
      confirmpassword: '',
    }
  });
  
  const [firstname, firstnameAttrs] = defineField('firstname');
  const [lastname, lastnameAttrs] = defineField('lastname');
  const [email, emailAttrs] = defineField('email');
  const [phoneno, phonenoAttrs] = defineField('phoneno');
  const [age, ageAttrs] = defineField('age');
  const [password, passwordAttrs] = defineField('password');
  const [confirmpassword, confirmpasswordAttrs] = defineField('confirmpassword');
  
  const router = useRouter();
  const mainerror = ref('');
  
  const onSubmit = handleSubmit(async (values) => {
      let response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      let data = await response.json();

      if (data.statusCode === 200) {
          router.push('/');
        } else {
          mainerror.value = data.message;
      }
  });
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 100px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 93%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  span {
    color: red;
    font-size: 12px;
  }
  </style>
  