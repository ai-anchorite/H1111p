module.exports = {
  run: [
    // Requires NVIDIA GPU
    {
      when: "{{gpu !== 'nvidia'}}",
      method: "notify",
      params: {
        html: "This app requires an NVIDIA GPU."
      }, 
       next: null
     },
     
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/maybleMyers/H1111.git app",
        ]
      }
    },

    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",               
          path: "app",               
          // xformers: true   // uncomment this line if your project requires xformers
          triton: true,   // uncomment this line if your project requires triton.  
          sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
    
    {
      method: "shell.run",
      params: {
        venv: "env",              
        path: "app",               
        message: [
          "uv pip install -r ../requirements.txt",  // "../" points up to the Pinokio script directory where (torched removed) requirements files are stored
          "uv pip install bitsandbytes",
        ]
      }
    },
    
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "maybleMyers/framepack_h1111" ],
        "exclude": '".gitattributes" "Experimental*" "*.md"',
        "local-dir": "hunyuan",
      }
    },
  ]
}
