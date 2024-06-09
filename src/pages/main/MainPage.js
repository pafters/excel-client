import { useEffect, useState } from "react";
import FileUpload from "../../components/uploads/FileUpload";
import ExcelEditor from "../../components/excel/ExcelEditor";
import QuitButton from "../../components/quit/QuitButton";
import { checkToken } from "../../modules/router";

export default function MainPage() {
    const [token, updToken] = useState(null)

    useEffect(() => {
        const localToken = localStorage.getItem('excel_handler_token');
        if (localToken) {
            const fetchObj = async () => {
                try {
                    const tokenInfo = await checkToken(localToken)
                    if (tokenInfo) {
                        if (tokenInfo.status === 200)
                            updToken(localToken);
                    }
                } catch (e) {
                    updToken('');
                    localStorage.removeItem('excel_handler_token');
                    window.location.replace('/auth')
                }

            }
            fetchObj();
        }
        else window.location.replace('/auth')
    }, [])

    return (
        <div>
            {token &&
                <div>
                    <QuitButton />
                    <FileUpload token={token} />
                    <ExcelEditor token={token} />
                </div>}
        </div>
    );
}