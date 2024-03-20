import { defineStore } from 'pinia';

function loadInitialState(): any[] {
  let userArrayString = localStorage.getItem('userArray');
  console.log("Retrieved from localStorage:", userArrayString);
  
  if (!userArrayString) {
    // If localStorage is empty, set default values and return them
    const defaultUserArray = [{
      id: 1,
      name: "Admin",
      selectedRole: 3,
      selectedTL: 0,
      process: "",
      email: "admin@gmail.com",
      password: "123"
    }];
    localStorage.setItem('userArray', JSON.stringify(defaultUserArray));
    return defaultUserArray;
  }

  return JSON.parse(userArrayString) as any[];
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userArray: loadInitialState()
  }),
  actions: {
    addUser(newValue: any) {
      if (!Array.isArray(this.userArray)) {
        this.userArray = [];
      }

      let found = false;
      for (let i = 0; i < this.userArray.length; i++) {
        if (this.userArray[i].id === newValue.id) {
          if (newValue.status === 0) {
            this.userArray = this.userArray.filter((i) => i.id !== newValue.id)
          } else {
            this.userArray[i] = newValue;
          }
          found = true;
          break;
        }
      }

      if (!found) {
        this.userArray.push(newValue);
      }

      this.persistState(); 
    },

    persistState() {
      localStorage.setItem('userArray', JSON.stringify(this.userArray));
    }
  }
});
