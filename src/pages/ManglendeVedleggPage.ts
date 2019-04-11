import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

export default class ManglendeVedleggPage {
    uploadBtn: Selector;

    constructor() {
        this.uploadBtn = Selector('.attachmentButton');
    }

    async uploadVedlegg(t: TestController) {
        await t.setFilesToUpload('input[type=file]', ['../uploads/doc.pdf']).click(this.uploadBtn);
    }
}
