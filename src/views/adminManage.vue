<template>
  <v-container >
    <v-layout row wrap class="justify-center">
      <v-flex xs10 sm10 lg8>
        <h4>Add New Product</h4>
          <!-- <v-alert type="success" v-if="added" >
           Product added
         </v-alert> -->
          <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card>
      <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Info
        </v-card-title>
        <v-card-text>
          <v-alert type="success">
         Item added
         </v-alert>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Add More
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
      </v-flex>
    </v-layout >
    <v-layout row class="justify-center">
      <v-flex xs8>
        <form @submit.prevent="OnCreateProducts">
          <v-layout row class="justify-center">
            <v-flex xs12 sm6 >
              <v-text-field
                name="name"
                label="Product Name"
                id="name"
                v-model="name"
                required></v-text-field>
            </v-flex>
          </v-layout>
            <v-layout row class="justify-center">
            <v-flex xs12 sm6 >
              <v-text-field
                name="brand"
                label="Product Brand"
                id="brand"
                v-model="brand"
                required></v-text-field>
            </v-flex>
          </v-layout>
           <v-layout row class="justify-center">
            <v-flex xs12 sm6 >
              <v-text-field
                name="price"
                label="Product Price"
                id="price"
                v-model="price"
                type="number"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="justify-center"> 
            <v-flex xs12 sm6 >
              <v-text-field
                name="category"
                label="Category"
                id="category"
                v-model="category"
                required></v-text-field>
            </v-flex>
          </v-layout>
            <v-layout row class="justify-center"> 
            <v-flex xs12 sm6 >
              <v-text-field
                name="quantity"
                label="Quantity"
                id="quantity"
                type="number"
                v-model="quantity"
                required></v-text-field>
            </v-flex>
          </v-layout>
        
          <v-layout row class="justify-center">
            <v-flex xs12 sm6 >
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required></v-text-field>
            </v-flex>
          </v-layout>
            <v-layout row class="justify-center">
            <v-flex xs12 sm6 >
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
            <v-layout row class="justify-center">
            <v-flex xs12 sm6 >
              <v-btn raised class="primary" @click="onPickFile" :disabled="!onFilled">Product Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row class="justify-center">
            <v-flex xs12 sm6 >
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Add Product</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase, { storage } from "firebase/app"
import { mapActions,mapGetters } from 'vuex';

  export default {
     data: () => ({
   
        name: '',
        category: '',
        price:null,
        description: '',
        brand:'',
        imageUrl:'',
        imgurl:'',
        image:'',
        quantity:null,
        actualFile:'',
        randomKey:Math.random().toString(36).substr(2, 9),
        dialog:false
    }),
  
  created(){ 
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        // this.$store.dispatch('fetchUserData')
      }else{
        this.$router.push("/")
      }
    })
  },
    computed: {
      formIsValid () {
        return this.name !== '' &&
          this.brand !== '' &&
          this.imageUrl !== '' &&
          this.price !== '' &&
          this.category !==''&&
          this.quantity!==''&&
          this.description !== ''
      },
      onFilled(){
          return this.category !==''
      },
      
        user () {
        return this.$store.getters.user
      }
    },
      watch: {
      user (value) {
        if (value == null && value == undefined) {
          this.$router.push('/login')
          console.log("user not logged in")
        }
      },
    },
    methods: {
      OnCreateProducts () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const productData = {
          name: this.name,
          price: parseInt(this.price),
          image: this.imgurl,
          description: this.description,
          brand: this.brand,
          cat:this.category,
          key:this.randomKey,
          quantity:this.quantity
        }
        this.$store.dispatch('addProducts', productData).then(() => {
         this.dialog=true
          this.name = '' ,
          this.brand = '',
          this.imageUrl = '' ,
          this.price = '' ,
          this.category ='',
          this.description = '',
          this.quantity=''
        })
        //this.$router.push('/meetups')
      },
      onPickFile () {
        this.$refs.fileInput.click()
        
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        let actualFile = files[0]
        
        console.log(filename,actualFile,this.category)
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
          const fileReader = new FileReader()
         fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
         fileReader.readAsDataURL(files[0])
        this.image = files[0]
        this.imgurl="https://firebasestorage.googleapis.com/v0/b/grossstore-cdaba.appspot.com/o/"+this.category+'%2F'+this.randomKey+"?alt=media"
        this.actualFile=actualFile
         var storage = firebase.storage();
          var storageRef=storage.ref()
         var metadata = {
        contentType: 'image/jpeg',
      }   
      var uploadTask = storageRef.child(this.category+'/'+this.randomKey).put(actualFile, metadata)

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
     function(snapshot) {

    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    this.value=progress
          console.log('Upload is ' + progress + '% done')

          switch (snapshot.state) {
         
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break;
          }
        }, function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, function() {

        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL)
          
        })
      })    
      
      
      }
    },
  
    
  }
</script>