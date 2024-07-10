<template>
    <div class="form-preview">
      <!-- Display form title and description -->
      <h2>{{ formTitle }}</h2>
      <p>{{ formDescription }}</p>
      
      <!-- Display form fields dynamically -->
      <div v-for="(field, index) in formFields" :key="index" class="form-field">
        <!-- Render different field types -->
        <template v-if="field.type === 'text-input'">
          <input type="text" :placeholder="field.props.placeholder" />
        </template>
        
        <template v-else-if="field.type === 'paragraph-input'">
          <textarea :placeholder="field.props.placeholder"></textarea>
        </template>
        
        <template v-else-if="field.type === 'checkbox-group'">
          <div v-for="(option, optIndex) in field.props.options" :key="optIndex" class="checkbox-option">
            <input type="checkbox" :id="'option-' + optIndex" />
            <label :for="'option-' + optIndex">{{ option }}</label>
          </div>
        </template>
        
        <template v-else-if="field.type === 'radio-group'">
          <div v-for="(option, optIndex) in field.props.options" :key="optIndex" class="radio-option">
            <input type="radio" :id="'option-' + optIndex" :name="'radio-' + index" />
            <label :for="'option-' + optIndex">{{ option }}</label>
          </div>
        </template>
        
        <template v-else-if="field.type === 'dropdown'">
          <select>
            <option v-for="(option, optIndex) in field.props.options" :key="optIndex">{{ option }}</option>
          </select>
        </template>
        
        <template v-else-if="field.type === 'date-picker'">
          <input type="date" />
        </template>
        
        <template v-else-if="field.type === 'time-picker'">
          <input type="time" />
        </template>
        
        <template v-else-if="field.type === 'file-upload'">
          <input type="file" />
        </template>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FormPreview',
    props: {
      formTitle: String,
      formDescription: String,
      formFields: Array
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
  
  .form-preview {
    font-family: 'Montserrat', sans-serif;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 40px auto;
  }
  
  .form-preview h2 {
    color: #007bff;
    font-size: 2em;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-preview p {
    color: #1a5276;
    font-size: 1.2em;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-field {
    margin-bottom: 20px;
  }
  
  .form-field label {
    display: block;
    font-weight: 500;
    margin-bottom: 10px;
    color: #333;
  }
  
  .form-field input[type="text"],
  .form-field textarea,
  .form-field select,
  .form-field input[type="date"],
  .form-field input[type="time"],
  .form-field input[type="file"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }
  
  .form-field input[type="text"]:focus,
  .form-field textarea:focus,
  .form-field select:focus,
  .form-field input[type="date"]:focus,
  .form-field input[type="time"]:focus,
  .form-field input[type="file"]:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
  }
  
  .checkbox-option,
  .radio-option {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .checkbox-option input,
  .radio-option input {
    margin-right: 10px;
  }
  
  .checkbox-option label,
  .radio-option label {
    color: #555;
  }
  
  .form-field select {
    background-color: #fff;
  }
  
  .form-field textarea {
    resize: vertical;
  }
  
  .form-field input[type="file"] {
    padding: 8px;
  }
  </style>
  