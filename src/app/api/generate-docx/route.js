import { createReport } from 'docx-templates';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { type, data, isShort } = await request.json();
    let templateName;
    if (type === 'personal') {
      templateName = isShort ? 'personal-template-short.docx' : 'personal-template.docx';
    } else {
      templateName = isShort ? 'template-short.docx' : 'template.docx';
    }
    const template = fs.readFileSync(path.join(process.cwd(), 'public', templateName));
    
    const buffer = await createReport({
      template,
      data: data,
      cmdDelimiter: ['{', '}'],  // Use curly braces for placeholders
    });

    const fileName = type === 'company' 
      ? `${data.companyNameEnglish} POA.docx`
      : `${data.fullNameEnglish} POA.docx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}