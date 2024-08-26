<?php
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=" . $filename . ".xls");
header("Pragma: no-cache");
header("Expires: 0");  ?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Export Excel</title>
</head>

<body>
    <table border="1" cellpadding="5" cellspacing="0">
        <h4>Tanggal : <?= date('Y-m-d H:i:s'); ?> </h4>

        <thead>
            <tr>
                <th>Branch Name</th>
                <th>Bank Name</th>
                <th>Employee Code</th>
                <th>Employee Name</th>
                <th>Bpjs Name</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($data as $row) : ?>
                <tr>
                    <td><?= htmlspecialchars($row['branchName']); ?></td>
                    <td><?= htmlspecialchars($row['bankName']); ?></td>
                    <td><?= htmlspecialchars($row['employeeCode']); ?></td>
                    <td><?= htmlspecialchars($row['employeeName']); ?></td>
                    <td><?= htmlspecialchars($row['bpjsName']); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>

</html>