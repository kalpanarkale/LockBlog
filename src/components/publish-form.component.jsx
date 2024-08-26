import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import {Toaster,toast} from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";

const PublishForm =() => {

    let characterLimit=200;

    let {blog, blog:{ banner, title,tags,des }, setEditorState, setBlog}= useContext(EditorContext);

    const handleCloseEvent= () =>{
        setEditorState("editor")
    }

    const handleBlogTitleChange =(e)=>{
         let input=e.target;
         setBlog({...blog,title:input.value})
    }

    const handleBlogDesChange = (e) =>{
        let input = e.target;
        setBlog({...blog, des:input.value })
    }

    return(
        <AnimationWrapper>
            <section className="w-screen min-h-screen grid items-center lg:grid-clos-2 py-16 lg:gap-4">
                <Toaster />
                <button className="w-20 h-20 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
                onClick={handleCloseEvent}>
                <i className="fi fi-rr-cross-circle"></i>
                </button>

                <div className="max-w-[550px] center">
                    <p className="text-dark-grey mb-1">Preview</p>

                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
                        <img src={banner} />
                    </div>

                    <h1 className="text-4xl mt-2 leading-tight line-clamp-2 ">{title}</h1>

                    <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">{des}</p>
                </div>

                < div className="border-grey lg:border-1 lg-pl-8">
                    <p className=" text-dark-grey mb-2 mt-9">Blog Title</p>
                    <input type="text" placeholder="Blog Title" defaultValue={title} className="input-box pl-4" 
                    onChange={handleBlogTitleChange}/>

                    <p className=" text-dark-grey mb-2 mt-9">Short Description</p>
                    <textarea   
                        maxLength={characterLimit}
                        defaultValue={des}
                        className="h-40 resize-none leading-7 input-box pl-4"
                        OnChange={handleBlogDesChange}>
                      
                    </textarea>

                </div>

            </section>
        </AnimationWrapper>
    ) 

}

export default PublishForm;