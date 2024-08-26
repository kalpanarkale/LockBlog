import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png"
import { useContext, useEffect } from "react";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
import {Toaster, toast} from "react-hot-toast";


const BlogEditor =() => { 

    let { blog, blog: {title, banner, content, tags, des}, setBlog, textEditor, setTextEditor, setEditorState} =useContext(EditorContext)

    //useEffect
    useEffect(()=>{
        setTextEditor(new EditorJS({
            holderId: "textEditor",
            data: content,
            tools: tools, 
            placeholder: "Start writing the blog... "   
        }))
    },[])

    const handleBannerUpload=(e) =>{
        let img = e.target.files[0];
        console.log(img);
    }

    const handleTitleKeyDown =(e) =>{
        if(e.keyCode==13){
            e.preventDefault();
        }
    }

    const handleTitleChange =(e) => {
        let input= e.target;
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + "px";

        setBlog({ ...blog, title: input.value})
    }

    const handlePublishEvent =()=> {
        /*if (!banner.length){
            return toast.error("Upload a banner to publish blog")
        }*/
        if (!title.length){
            return toast.error("Write blog title to publish blog")
        }
        if(textEditor.isReady){
            textEditor.save().then(data => {
                if(data.blocks.length){
                    setBlog({...blog,content: data});
                    setEditorState("publish")
                }else{
                    return toast.error("Write something to publish it")
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    return(
        <>
            <nav className="navbar">
            <Link to="/" className="flex-none w-20">
            <i className="fi fi-rr-nfc-lock"></i></Link>                            
            <p className="max-md:hidden text-black line-clamp-1 w-full">
                   {  title.length ? title : " New Blog "}
            </p>

                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2" onClick={handlePublishEvent}>Publish</button>
                    <button className="btn-light py-2">Save Draft</button>
                </div>
            </nav>

            <AnimationWrapper>
                <Toaster />
                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                        <div className="relative aspect-video hover:opacity-60 bg-white border-4 border=grey">
                            <label htmlForm="uploadBanner">
                            <img
                            src={defaultBanner} 
                            className="z-20" />
                                <input  id="uploadBanner"
                                type="file"
                                accept=".png, .jpg,.jpeg"
                                hidden
                                onChange={handleBannerUpload}

                                />
                            </label>

                        </div>

                        <textarea
                            defaultValue={title}
                            placeholder="Blog Title"
                            className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder: opacity-90"
                            onKeyDown={handleTitleKeyDown}
                            onChange={handleTitleChange}
                            >
                        </textarea>

                        <hr className="w-full opacity-30 my-5" />

                        <div id="textEditor" className="font-gelasio">

                        </div>

                    </div>
                </section>

            </AnimationWrapper>
        </>
    ) 

}

export default BlogEditor;