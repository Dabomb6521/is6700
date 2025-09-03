const myCompany = {
    companyName: BlueShift,
    companyType: Tech,
    ownerFirstName: Brayden,
    ownerLastName: Corbridge,
    incorporationDate: new Date('2025-09-02')
};

const invoices = [
    {
        invoiceNumber: '1',
        customerName: 'Bob Timothy',
        TotalDue: 100.0,
        totalPaid: 50.0,
        dueDate: new Date('2025-09-01'),
        payMethod: "Card"
    },
    {
        invoiceNumber: '2',
        customerName: 'Jimmy Dean',
        TotalDue: 450.0,
        totalPaid: 300.0,
        dueDate: new Date('2025-09-03'),
        payMethod: "Card"
    },
    {
        invoiceNumber: '3',
        customerName: 'Jessica Doyal',
        TotalDue: 75.0,
        totalPaid: 30.0,
        dueDate: new Date('2025-09-09'),
        payMethod: "Cash"
    },
    {
        invoiceNumber: '4',
        customerName: 'Mandy Smith',
        TotalDue: 620.0,
        totalPaid: 300.0,
        dueDate: new Date('2025-09-12'),
        payMethod: "Card"
    },
    {
        invoiceNumber: '5',
        customerName: 'Jeremiah Bullfrog',
        TotalDue: 250.0,
        totalPaid: 200.0,
        dueDate: new Date('2025-09-17'),
        payMethod: "Cash"
    }
];

export function printInvoices(invoices) {
    for (let i = 0; i < invoices.length; i++) {
        console.log(`Invoice: ${invoiceNumber} for customer ${customerName} is due on ${dueDate} via ${payMethod} and has a remaining balance of ${TotalDue - totalPaid}`);
    }
}

module.exports = {myCompany, invoices};