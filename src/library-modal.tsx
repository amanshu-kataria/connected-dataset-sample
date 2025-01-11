import {
  Button,
  Checkbox,
  Dialog,
  IconButton,
  Table,
  Text,
} from "@radix-ui/themes";
import { Status, StatusChip, TextInput } from "./components";
import { useForm } from "react-hook-form";
import {
  ArrowRightIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { libraryData } from "./library-data";
import { useState } from "react";

const borderColor = "#E4E7EC";

const tableCellStyle = {
  display: "flex",
  gap: "6px",
  height: "100%",
  alignItems: "center",
};

interface GetLabelStatusReturn {
  label: string;
  type: Status;
}

const getLabelStatus = (status: number): GetLabelStatusReturn => {
  switch (status) {
    case 0:
      return {
        label: "Error",
        type: "error",
      };

    case 1:
      return {
        label: "Uploaded",
        type: "success",
      };

    case 2:
      return {
        label: "Connected",
        type: "success",
      };

    default:
      return {
        label: "Error",
        type: "error",
      };
  }
};

export const LibraryModal = () => {
  const [checkedItems, setCheckedItem] = useState(new Set());
  const [libData, setLibData] = useState(libraryData);
  const [allChecked, setAllChecked] = useState(false);

  const { register } = useForm({
    defaultValues: {
      search: "",
    },
    mode: "all",
  });

  const selectAllRows = (val: boolean) => {
    const newChecked = new Set();

    if (val) {
      libData.forEach((item) => {
        newChecked.add(item.id);
      });
    }

    setAllChecked(libData.length > 0 && libData.length === newChecked.size);

    setCheckedItem(newChecked);
  };

  const onFilterData = (val: string) => {
    setLibData(
      libraryData.filter((item) => {
        return (
          item.name.toLowerCase().includes(val.toLowerCase()) ||
          item.created_by.name.toLowerCase().includes(val.toLowerCase()) ||
          item.created_by.email.toLowerCase().includes(val.toLowerCase())
        );
      })
    );
  };

  const onRowSelected = (value: boolean, id: string) => {
    const newChecked = new Set(checkedItems);
    if (value) {
      newChecked.add(id);
    } else {
      newChecked.delete(id);
    }

    setCheckedItem(newChecked);

    setAllChecked(libData.length > 0 && libData.length === newChecked.size);
  };

  return (
    <main style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <nav style={{ width: "100px" }}></nav>
      <section>
        <Dialog.Root open={true}>
          <Dialog.Content
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 0,
              width: "content-fit",
              maxWidth: "80vw",
              height: "85vh",
              overflowY: "hidden",
            }}
          >
            <header
              style={{
                borderBottom: `1px solid ${borderColor}`,
                padding: "16px 16px 0px",
              }}
            >
              <Dialog.Title style={{ display: "flex", alignItems: "center" }}>
                Library
                <IconButton variant="ghost" style={{ marginLeft: "auto" }}>
                  <Cross2Icon />
                </IconButton>
              </Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Here is a list of datasets already connected to your Obviously
                AI account.
              </Dialog.Description>
            </header>

            <TextInput
              label=""
              placeholder="Search"
              type="text"
              inputProps={register("search", {})}
              size="small"
              style={{ width: "200px", margin: "16px" }}
              icon={<MagnifyingGlassIcon />}
              onInputChange={(e) => onFilterData(e.target.value)}
            />

            <div
              style={{
                padding: "16px 16px 0px",
                flex: 1,
                height: "400px",
                overflowY: "scroll",
              }}
            >
              <Table.Root
                style={{
                  border: `1px solid ${borderColor}`,
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell style={tableCellStyle}>
                      <Checkbox
                        checked={allChecked}
                        onCheckedChange={selectAllRows}
                      />
                      Dataset Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Created at</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Created by</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {libData.map((data) => {
                    const iconPath = `./src/assets/Icons/File type=${
                      data.type
                    }/${data.fileType.toUpperCase()}, Type=Default.svg`;

                    const label = getLabelStatus(data.status);

                    return (
                      <Table.Row
                        key={data.id}
                        style={{
                          height: "100%",
                        }}
                      >
                        <Table.RowHeaderCell
                          style={{
                            display: "flex",
                            gap: "6px",
                            height: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            checked={checkedItems.has(data.id)}
                            onCheckedChange={(val) =>
                              onRowSelected(val as boolean, data.id)
                            }
                          />
                          <img src={iconPath} height={"20px"} />
                          <span>{data.name}</span>
                        </Table.RowHeaderCell>
                        <Table.Cell style={{ verticalAlign: "middle" }}>
                          <StatusChip label={label.label} type={label.type} />
                        </Table.Cell>
                        <Table.Cell style={{ verticalAlign: "middle" }}>
                          {data.created_at}
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Text>{data.created_by.name}</Text>
                            <Text>{data.created_by.email}</Text>
                          </div>
                        </Table.Cell>
                        <Table.Cell style={{ verticalAlign: "baseline" }}>
                          <IconButton variant="ghost">
                            <TrashIcon />
                          </IconButton>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Root>
            </div>
            <div
              style={{
                width: "100%",
                padding: "16px",
              }}
            >
              <Button style={{ display: "flex", marginLeft: "auto" }}>
                Next <ArrowRightIcon />
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </section>
    </main>
  );
};
