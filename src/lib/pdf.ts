import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function downloadPDF(elementId: string, fileName: string = 'cv.pdf') {
    const element = document.getElementById(elementId)
    if (!element) {
        console.error('Element not found')
        return
    }

    try {
        const canvas = await html2canvas(element, {
            scale: 2, // Améliore la qualité
            useCORS: true, // Pour les images externes
            logging: false,
        })

        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        })

        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save(fileName)
    } catch (error) {
        console.error('Error generating PDF:', error)
    }
}
