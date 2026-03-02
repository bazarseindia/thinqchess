async function checkApis() {
    try {
        console.log("Checking API/public/gallery...");
        const resGal = await fetch('http://localhost:3000/api/public/gallery');
        console.log("Gallery:", await resGal.json());
        
        console.log("Checking API/public/blogs...");
        const resBlog = await fetch('http://localhost:3000/api/public/blogs');
        console.log("Blogs:", await resBlog.json());
    } catch(e) {
        console.error(e.message);
    }
}
checkApis();
