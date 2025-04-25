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
    
    // Overwrite existing H1111.py with server fix "demo.queue().launch(share=False)"
    {
      method: "fs.copy",
      params: {
        src: "H1111.py",
        dest: "app/H1111.py"
      }
    }, 
    
    // Will need to adjust torch.js and requirements to allow torch 2.6.0+ for SA and torch 2.7+ for 5000 series
    // Only 3000 & 4000 series NVIDIA currently supported (torch 2.5.1)
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",               
          path: "app",               
          // xformers: true   // uncomment this line if your project requires xformers
          // triton: true,   // uncomment this line if your project requires triton.   triton-windows and SA require torch>=2.6.0 
          // sageattention: true   // uncomment this line if your project requires sageattention
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
          // "uv pip install -r ../requirementsFP.txt"
        ]
      }
    },
  ]
}
