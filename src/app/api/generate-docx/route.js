import { createReport } from 'docx-templates';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { type, data } = await request.json();
    const templateName = type === 'personal' ? 'personal-template.docx' : 'template.docx';
    const template = fs.readFileSync(path.join(process.cwd(), 'public', templateName));
    
    const buffer = await createReport({
      template,
      data: data,
      cmdDelimiter: ['{', '}'],  // Use curly braces for placeholders
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename=${type}-poa.docx`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}