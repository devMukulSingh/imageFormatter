import { NextRequest, NextResponse } from "next/server";
import { fromBase64 } from "pdf2pic";
import { pdf } from "pdf-to-img";

export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();
    const file = formData.get('file')?.toString();
    const password = formData.get('password')?.toString();

    if (!file) {
        return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }
    if (!password) {
        return NextResponse.json({ error: 'password is required' }, { status: 400 })
    }
    try {
        const document = await pdf(file, { scale: 3 ,password});
        const image = document.getPage(1);
        console.log(document.getPage(1));
        return NextResponse.json(image,{status:200})
    }

    catch (e) {
        return NextResponse.json(e, { status: 500 })
    }

}
// const options = {
//     density: 100,
//     saveFilename: "untitled",
//     savePath: "./images",
//     format: "png",
//     width: 600,
//     height: 600

// };
// const convert = fromBase64(file, options);
// const pageToConvertAsImage = 1;
// try{

//     const pdf = convert(pageToConvertAsImage, { responseType: "image" }).then((resolve) => {
//         console.log("Page 1 is now converted as image");
//         return resolve;
//     });
//     console.log(pdf);
//     return NextResponse.json(pdf,{status:200});